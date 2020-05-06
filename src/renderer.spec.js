describe('renderer', function () {
    it('should show initial vending machine', function () {

        expect($('#insert-quarter-btn').text()).toContain('Insert Quarter');
    })
})