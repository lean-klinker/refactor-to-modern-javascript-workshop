describe('renderer', function () {
    beforeAll(function (done) {
        setTimeout(done, 1000);
    });

    beforeEach(function () {
        $('#return-coins-btn').trigger('click');
        $('#available-products').html('');
    })

    it('when rendered then displays vending machine buttons', function () {
        expect($('#insert-quarter-btn').length).toEqual(1);
        expect($('#insert-dime-btn').length).toEqual(1);
        expect($('#insert-nickel-btn').length).toEqual(1);
        expect($('#add-candy-btn').length).toEqual(1);
        expect($('#add-chips-btn').length).toEqual(1);
        expect($('#add-cola-btn').length).toEqual(1);
        expect($('#return-coins-btn').length).toEqual(1);
    })

    it('when quarter inserted then displays quarter as balance', function () {
        $('#insert-quarter-btn').trigger('click');

        expect($('#vending-machine').text()).toContain('$0.25');
    })

    it('when dime inserted then displays dime as balance', function () {
        $('#insert-dime-btn').trigger('click');

        expect($('#vending-machine').text()).toContain('$0.10');
    })

    it('when nickel inserted then displays nickel as balance', function () {
        $('#insert-nickel-btn').trigger('click');

        expect($('#vending-machine').text()).toContain('$0.05');
    })

    it('when chips added then shows chips as an available product', function () {
        $('#add-chips-btn').trigger('click');

        expect($('#available-products').text()).toContain('CHIPS');
    })

    it('when cola added then shows cola as an available product', function () {
        $('#add-cola-btn').trigger('click');

        expect($('#available-products').text()).toContain('COLA');
    })

    it('when candy added then shows candy as an available product', function () {
        $('#add-candy-btn').trigger('click');

        expect($('#available-products').text()).toContain('CANDY');
    })

    it('when coins returned then returned coins are shown', function () {
        $('#insert-nickel-btn').trigger('click');
        $('#insert-quarter-btn').trigger('click');

        $('#return-coins-btn').trigger('click');

        expect($('#returned-coins').text()).toContain('0.05')
        expect($('#returned-coins').text()).toContain('0.25')
    })
})