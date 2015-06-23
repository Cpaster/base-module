
module.exports = {

	isEmptyObject: function( obj ) {
			for ( var name in obj ) {
				return false;
			}
			return true;
	}

}