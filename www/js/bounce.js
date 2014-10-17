var bounceManager = {

    init: function() {

    },
    /*
     * target
     * Check whether the ball should fall into hole
     * @param {Double} x
     * @param {Double} y
     * @returns {Boolean}
     */
    target: function(x, y) {

        if ((y <= Target.position.y + Ball.size && y >= Target.position.y - Ball.size)
                && (x <= Target.position.x + Ball.size && x >= Target.position.x - Ball.size)) {

            return true;
        }

        return false;
    },
    /*
     * boundaries
     * Check whether the ball should crash against a boundary
     * @param {Double} x
     * @param {Double} y
     * @returns {String} collision direction
     */
    boundaries: function(x, y) {
        var ret = '';

        /* Boundaries */
        if (y <= (Boundaries.top - 0 + (Ball.size / 2))) {
            ret += 'top';
        }
        else if (y >= (Boundaries.height - 0 + Boundaries.margin - (Ball.size / 2))) {
            ret += 'bottom';
        }

        if (x <= (Boundaries.left + (Ball.size / 2))) {
            ret += 'left';
        }
        else if (x >= (Boundaries.width - 0 + Boundaries.margin - (Ball.size / 2))) {
            ret += 'right';
        }

        if (ret !== '') {
            return ret;
        }

        return false;
    }
};
