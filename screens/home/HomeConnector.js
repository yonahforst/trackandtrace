
import { connect } from 'react-redux'
import HomeScreen from './HomeScreen'

import {
  toggleShouldTrackLocation,
} from '../../state/actions/user'

const mapStateToProps = (state, ownProps) => {
  return {
    isTrackingLocation: state.trips.isTrackingLocation,
    shouldTrackLocation: state.user.shouldTrackLocation,
  }
}

const mapDispatchToProps = {
  toggleShouldTrackLocation,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)