function skillsMember() {
    return {
        restrict: 'E',
        templateUrl: 'app/member/member.html',
        controller: 'SkillsMemberController',
        controllerAs: 'vm',
        bindToController: true,
        scope: {
            member: '='
        }

    };
}