
import { connect } from 'react-redux'
import TripsScreen from './TripsScreen'

import {
  deleteTrips
} from '../../state/actions/trips'

const mapStateToProps = (state, ownProps) => {

  const {
    trips: {
      currentTripId,
      history,
    }
  } = state 

  return {
    history: Object.keys(history).filter(id => id != currentTripId)
  }
}

const mapDispatchToProps = {
  deleteTrips,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripsScreen)