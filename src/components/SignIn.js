import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import {
  Paper,
  TextField,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
  FlatButton,
  RaisedButton,
  Dialog
} from 'material-ui'

const renderTextInput = (field) => {
  const textFieldStyle = {
    width: '70%'
  }
  const styles = {
    errorStyle: {
      color: 'rgb(180,62,64)'
    },
    underlineStyle: {
      borderColor: 'rgb(32,50,67)'
    },
    floatingLabelStyle: {
      color: 'rgb(32,50,67)'
    },
    floatingLabelFocusStyle: {
      color: 'rgb(126,161,107)'
    }
  }

  return (
    <TextField
      className='authTextField'
      type={field.type}
      style={textFieldStyle}
      floatingLabelText={field.label}
      hintText={field.label}
      errorText={field.meta.touched ? field.meta.error : null}
      underlineFocusStyle={styles.underlineStyle}
      hintStyle={styles.floatingLabelStyle}
      errorStyle={styles.errorStyle}
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      {...field.input}
      />
  )
}

class SignIn extends Component {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object.isRequired
  }

  onSubmit(userData) {
    this.props.signIn(userData)
    .then((response) => {
      if (response.payload.data.user) {
        if (
          response.payload.data.user.id &&
          response.payload.data.user.token &&
          response.payload.data.user.username) {
            window.localStorage['user_id'] = response.payload.data.user.id
            window.localStorage['username'] = response.payload.data.user.username
            window.localStorage['token'] = response.payload.data.user.token
            const { dispatch } = this.context.store
            const actions = bindActionCreators(this.props.setCurrentTab, dispatch)
            actions(0)
            this.context.router.push('/')
          } else {
            this.props.toggleSignInDialog(true, 'Email or Password incorrect')
          }
        } else if(response.payload.data.error){
          this.props.toggleSignInDialog(true, `${response.payload.data.error}`)
        }
      })
      .catch((err) => {
        this.props.toggleSignInDialog(true, `${err}`)
      })
    }

    handleDialogClose() {
      this.props.toggleSignInDialog(false)
    }

    render() {
      const { handleSubmit } = this.props

      const raisedButtonStyle = {
        margin: 12
      }

      return (
        <div className='authContainer'>
          <Card className='authCard'>
            <CardMedia
              overlay={<CardTitle title='SIGN IN' />}
              >
            </CardMedia>
          </Card>
          <Paper className='authForm' zDepth={5}>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field name='email' type='email' component={renderTextInput} label='Email'/>
              <Field name='password' type='password' component={renderTextInput} label='Password'/>
              <RaisedButton
                label='SIGN IN'
                className='authButton'
                type='submit'
                style={raisedButtonStyle} />
            </form>
          </Paper>

          <Dialog
            title='SIGN IN ERROR'
            actions={[
              <FlatButton
                label='CLOSE'
                className='authButton'
                keyboardFocused={true}
                onTouchTap={this.handleDialogClose.bind(this)}
                />
            ]}
            modal={false}
            open={this.props.showSignInDialog}
            onRequestClose={this.handleDialogClose.bind(this)}
            >
            {this.props.signInDialogValue}
          </Dialog>
        </div>
      )
    }
  }

  function validate(values) {
    const errors = {}
    if (!values.email) errors.email = 'Please enter your email'
    if (!values.password) errors.password = 'Please enter your password'
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(values.email) && values.email) errors.email = 'Please enter a valid email address'
    return errors
  }

  function mapStateToProps(state) {
    return {
      showSignInDialog: state.material_ui.showSignInDialog,
      signInDialogValue: state.material_ui.signInDialogValue
    }
  }

  export default connect(mapStateToProps, actions)(reduxForm({
    form: 'SignIn',
    fields: ['email', 'password', 'confirmpassword'],
    validate: validate
  })(SignIn))
