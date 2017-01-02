export default (['$rootScope', 'authService', '$state', '$localStorage', '$timeout',
    ($rootScope, authService, $state, $localStorage, $timeout) => {
        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            authService.hasSession()
                .then((res) => {
                    if (res && toState.mustBeLoggedOut || !res && toState.mustBeLoggedIn) {
                        $timeout(() => {
                            $state.go('layout.posts');
                            $rootScope.$emit('closeNavbarToggle', true);
                        });
                    } else {
                        $rootScope.$emit('closeNavbarToggle', true);
                    }
                })
                .catch((err) => {
                    $timeout(() => {
                        $state.go('layout.posts');
                        $rootScope.$emit('closeNavbarToggle', true);
                    });
                });
        });
    }
]);
