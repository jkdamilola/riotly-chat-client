import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../redux/actions';
import Login from '../../components/Login';

const mapStateToProps = state => {
  return {
    signingIn: state.api.isLoading.login,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.api.errors.login,
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onSignIn: login,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);