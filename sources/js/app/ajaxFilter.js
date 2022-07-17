export default class AjaxFilter {
    /**
     * Constructor
     * @param elementForm
     * @param options
     */
    constructor(elementForm, options) {
        this.elementForm = elementForm
        this.options = Object.assign({}, {
            ajaxTimeout: false,
            delayBeforeSend: 600,
            autoSubmit: true,
            dataChange: dataFilter => {}
        }, options)
        this.query = null

        this.init()
    }

    /**
     *
     * @param formElement
     * @returns {*[]}
     */
    serializeArray(formElement) {
        const formData = new FormData(formElement);
        const pairs = [];
        for (const [name, value] of formData) {
            pairs.push({name, value});
        }
        return pairs;
    }

    /**
     *
     * @param params
     * @param keys
     * @param isArray
     * @returns {string}
     */
    getUrlString(params, keys = [], isArray = false) {
        const p = Object.keys(params).map(key => {
            let val = params[key]

            if ("[object Object]" === Object.prototype.toString.call(val) || Array.isArray(val)) {
                if (Array.isArray(params)) {
                    keys.push("")
                } else {
                    keys.push(key)
                }
                return this.getUrlString(val, keys, Array.isArray(val))
            } else {
                let tKey = key

                if (keys.length > 0) {
                    const tKeys = isArray ? keys : [...keys, key]
                    tKey = tKeys.reduce((str, k) => {
                        return "" === str ? k : `${str}[${k}]`
                    }, "")
                }
                if (isArray) {
                    return `${tKey}[]=${val}`
                } else {
                    return `${tKey}=${val}`
                }

            }
        }).join('&')

        keys.pop()
        return p
    }

    searchParams() {
        let params = new URLSearchParams(location.search),
            query = {}

        for (let pair of params.entries()) {
            if (pair[1].indexOf(',') !== -1) {
                query[pair[0]] = pair[1].split(',')
            } else {
                query[pair[0]] = pair[1]
            }
        }

        this.query = query
        this.sendForm()
    }

    activateForm(el) {
        let isEmpty = (str) => {
            return !str || !/[^\s]+/.test(str);
        }

        let arrDataForm = this.serializeArray(el)

        if(arrDataForm.length) {
            let result = {};
            arrDataForm.forEach(function (item) {
                if (!isEmpty(item.value)) {
                    if (!result.hasOwnProperty(item.name)) {
                        result[item.name] = item.value
                    } else {
                        result[item.name] += ',' + item.value
                    }
                }
            })

            let url = '?' + decodeURIComponent(this.getUrlString(result));
            history.pushState({}, '', url);

            this.searchParams()
        } else {
            this.resetForm()
        }
    }

    resetForm() {
        history.pushState({}, '', '.');

        this.query = null
        this.sendForm()
    }

    sendForm() {
        if (typeof this.options.dataChange === 'function') {
            this.options.dataChange(this.query);
        } else {
            console.error('"dataChange" must be a function!')
        }
    }

    init() {
        document.querySelectorAll(this.elementForm).forEach(el => {
            el.addEventListener('submit', (e) => {
                e.preventDefault()

                if (!this.options.autoSubmit) {
                    this.activateForm(el)
                }
            })

            if (this.options.autoSubmit) {
                el.querySelectorAll('select, input, textarea').forEach(input => {
                    input.addEventListener('change', () => {
                        if (this.options.ajaxTimeout) clearTimeout(this.options.ajaxTimeout);
                        this.options.ajaxTimeout = setTimeout(() => {
                            this.activateForm(el)
                        }, this.options.delayBeforeSend)
                    })
                })
            }
        })

        window.addEventListener('popstate', () => {
            if (location.search !== '') {
                this.searchParams()
            } else {
                this.resetForm();
            }
        })

        if (location.search !== '') {
            this.searchParams()
        }
    }
}
