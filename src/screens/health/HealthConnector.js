
import { connect } from 'react-redux'
import HealthScreen from './HealthScreen'

import {
  submitReport,
} from '../../state/actions/health'

const mapStateToProps = (state, ownProps) => {

  const {
    health
  } = state 

  return {
    ...health
  }
}

const mapDispatchToProps = {
  submitReport,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HealthScreen)