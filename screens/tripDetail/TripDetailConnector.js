
import { connect } from 'react-redux'
import TripDetailScreen from './TripDetailScreen'


const mapStateToProps = (state, ownProps) => {
  const {
    route: {
      params: {
        tripId,
      }
    }
  } = ownProps

  const trip = state.trips.history[tripId]
  return {
    trip,
  }
}

const mapDispatchToProps = {
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TripDetailScreen)