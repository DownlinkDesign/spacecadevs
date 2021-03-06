class authService {
    /**@ngInject*/
    constructor($q, $http, HOST, $localStorage) {
        this.$q = $q;
        this.$http = $http;
        this.$localStorage = $localStorage;
        this.HOST = HOST;
        this.session = null;
    }

    setSession(data) {
        let deferred = this.$q.defer();
        if (data.user && data.token) {
            this.$localStorage.session = {
                user: data.user,
                token: data.token
            };
            this.session = true;
            deferred.resolve(true);
        } else {
            this.session = null;
            deferred.reject(false);
        }

        return deferred.promise;
    }

    getSession() {
        return this.session;
    }

    hasSession() {
        let deferred = this.$q.defer();
        if (this.$localStorage.session &&
            this.$localStorage.session.user &&
            this.$localStorage.session.token &&
            this.$localStorage.session.user &&
            this.$localStorage.session.token) {
            this.$http.post(`${this.HOST}/users/validate-session`, {
                    session: {
                        user: this.$localStorage.session.user,
                        token: this.$localStorage.session.token
                    }
                })
                .then((res) => {
                    if (res.data.success) {
                        this.setSession({
                                user: res.data.success.userSuccess,
                                token: res.data.success.tokenSuccess
                            })
                            .then((setSessionRes) => {
                                deferred.resolve(true);
                            })
                            .catch((err) => {
                                this.session = null;
                                deferred.resolve(false);
                            });
                    } else {
                        this.session = null;
                        deferred.resolve(false);
                    }
                })
                .catch((err) => {
                    deferred.resolve(false);
                });
        } else {
            deferred.resolve(false);
        }
        return deferred.promise;
    }

    clearSession() {
        delete this.$localStorage.session;
        this.session = null;
    }
};

export default authService;
