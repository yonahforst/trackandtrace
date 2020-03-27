
import { connect } from 'react-redux'
import NavigationScreen from './NavigationScreen'

const mapStateToProps = (state, ownProps) => {
  return {
    showIntro: state.user.showIntro,
  }
}

export default connect(
  mapStateToProps,
  {}
)(NavigationScreen)