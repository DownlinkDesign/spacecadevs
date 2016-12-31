class NavbarController {
    /**@ngInject*/
    constructor(authService, $scope, $localStorage, $state) {
        this.authService = authService;
        this.$scope = $scope;
        this.$localStorage = $localStorage;
        this.session = this.authService.getSession();
        this.$state = $state;
        this.$scope = $scope;

        this.$scope.$watch(() => {
            return this.authService.getSession();
        }, (newVal) => {
            this.session = newVal;
        }, true);
    }

    signout() {
        this.authService.clearSession();
        this.$state.go('layout.posts');
    }
};

export default NavbarController;
