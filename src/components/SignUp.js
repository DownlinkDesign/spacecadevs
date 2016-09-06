import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, change, submitting, asyncValidating } from 'redux-form'
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
  Dialog,
  Checkbox
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

class SignUp extends Component {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object.isRequired
  }

  onSubmit(userData) {
    this.props.signUp(userData)
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
            this.props.toggleSignUpDialog(true, 'Server could not add you to the database')
          }
        } else if(response.payload.data.error){
          this.props.toggleSignUpDialog(true, `${response.payload.data.error}`)
        }
      })
      .catch((err) => {
        this.props.toggleSignUpDialog(true, `${err}`)
      })
    }

    handleDialogClose() {
      this.props.toggleSignUpDialog(false)
    }

    render() {
      const { handleSubmit } = this.props

      const raisedButtonStyle = {
        margin: 12
      }

      const checkBoxStyle = {
        block: {
          maxWidth: 250
        },
        checkbox: {
          marginBottom: 16
        }
      }

      return (
        <div className='authContainer'>
          <Card className='authCard' key={0}>
            <CardMedia
              overlay={<CardTitle title='SIGN UP' />}
              >
            </CardMedia>
          </Card>
          <Paper className='authForm' zDepth={5}>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Field
                name='username'
                type='text'
                component={renderTextInput}
                label='Username'/>
              <Field
                name='email'
                type='email'
                component={renderTextInput}
                label='Email'/>
              <Field
                name='password'
                type='password'
                component={renderTextInput}
                label='Password'/>
              <Field
                name='confirmpassword'
                type='password'
                component={renderTextInput}
                label='Re-Type Password'/>
              <RaisedButton
                label='SIGN UP'
                disabled={submitting || asyncValidating}
                className='authButton'
                type='submit'
                style={raisedButtonStyle} />
            </form>
          </Paper>

          <Dialog
            title='SIGN UP ERROR'
            actions={[
              <FlatButton
                label='CLOSE'
                className='authButton'
                keyboardFocused={true}
                onTouchTap={this.handleDialogClose.bind(this)}
                />
            ]}
            modal={false}
            open={this.props.showSignUpDialog}
            onRequestClose={this.handleDialogClose.bind(this)}
            >
            {this.props.signUpDialogValue}
          </Dialog>

        </div>
      )
    }
  }

  function validate(values) {
    const errors = {}

    if (!values.username) errors.username = 'Please enter your username'
    if (values.username && values.username.length > 20) errors.username = 'Username cannot exceed 20 characters'

    if (!values.email) errors.email = 'Please enter your email'
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(values.email) && values.email) errors.email = 'Please enter a valid email address'

    if (!values.password) errors.password = 'Please enter your password'
    if (!values.confirmpassword) errors.confirmpassword = 'Please re-enter your password'
    if (values.confirmpassword !== values.password && values.confirmpassword) errors.confirmpassword = 'This password does not match'

    return errors
  }

  function mapStateToProps(state) {
    return {
      showSignUpDialog: state.material_ui.showSignUpDialog,
      signUpDialogValue: state.material_ui.signUpDialogValue
    }
  }

  export default connect(mapStateToProps, actions)(reduxForm({
    form: 'SignUp',
    fields: ['username', 'email', 'password', 'confirmpassword'],
    validate: validate
  })(SignUp))
