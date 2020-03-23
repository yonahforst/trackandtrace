
import { connect } from 'react-redux'
import HomeScreen from './HomeScreen'

const mapStateToProps = (state, ownProps) => {
  return {
    isTrackingLocation: state.trips.isTrackingLocation
  }
}

export default connect(
  mapStateToProps,
  {}
)(HomeScreen)