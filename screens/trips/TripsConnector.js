
import { connect } from 'react-redux'
import TripsScreen from './TripsScreen'

import {
  deleteTrips
} from '../../state/actions/trips'

const mapStateToProps = (state, ownProps) => {

  const {
    trips: {
      pastTripIds,
    }
  } = state 

  return {
    tripIds: pastTripIds,
  }
}

const mapDispatchToProps = {
  deleteTrips,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripsScreen)