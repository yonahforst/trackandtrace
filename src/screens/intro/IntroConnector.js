
import { connect } from 'react-redux'
import IntroScreen from './IntroScreen'

import {
  checkPermissions,
  askPermission,
} from '../../state/actions/permission'

import {
  setGeofence,
  setShowIntro,
} from '../../state/actions/user'

const mapStateToProps = (state, ownProps) => {
  return {
    permissions: state.permissions,
    geofence: state.user.geofence,
  }
}

const mapDispatchToProps = {
  checkPermissions,
  askPermission,
  setGeofence,
  onFinishIntro: () => setShowIntro(false),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroScreen)