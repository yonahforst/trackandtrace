
import { connect } from 'react-redux'
import HomeScreen from './HomeScreen'

import {
  toggleShouldTrackLocation,
} from '../../state/actions/user'

import {
  LOCATION
} from 'expo-permissions'

const mapStateToProps = (state, ownProps) => {
  return {
    isTrackingLocation: state.trips.isTrackingLocation,
    shouldTrackLocation: state.user.shouldTrackLocation,
    locationPermission: state.permissions[LOCATION],
  }
}

const mapDispatchToProps = {
  toggleShouldTrackLocation,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)