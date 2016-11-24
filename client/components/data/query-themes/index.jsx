/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

/**
 * Internal dependencies
 */
import { requestThemes } from 'state/themes/actions';
import { isRequestingThemesForQuery } from 'state/themes/selectors';

class QueryThemes extends Component {
	static propTypes = {
		siteId: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.oneOf( [ 'wpcom' ] )
		] ).isRequired,
		query: PropTypes.object,
		// Connected props
		isRequesting: PropTypes.bool.isRequired,
		requestThemes: PropTypes.func.isRequired,
	}

	componentDidMount() {
		this.request( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.siteId === nextProps.siteId &&
				isEqual( this.props.query, nextProps.query ) ) {
			return;
		}
		this.request( nextProps );
	}

	request( props ) {
		if ( ! props.isRequesting ) {
			props.requestThemes( props.siteId, props.query );
		}
	}

	render() {
		return null;
	}
}

export default connect(
	( state, { query, siteId } ) => ( {
		isRequesting: isRequestingThemesForQuery( state, siteId, query ),
	} ),
	{ requestThemes }
)( QueryThemes );
