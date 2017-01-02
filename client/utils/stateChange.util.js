export default (['$rootScope', 'authService', '$state', '$localStorage', '$timeout',
    ($rootScope, authService, $state, $localStorage, $timeout) => {
        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            if (fromState.name === 'layout.createPost' && !confirm('If you are in the middle of writing a post you may lose your progress by navigating away from this page')) {
                event.preventDefault();
            } else {
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
            }
        });
    }
]);
