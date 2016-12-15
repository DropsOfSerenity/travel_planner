module V1
  class SessionsController < ApplicationController
    skip_before_action :authenticate_user!

    def create
      @user = User.find_for_database_authentication(email: params[:email])
      return invalid_login_response unless @user

      if @user.valid_password?(params[:password])
        sign_in :user, @user
        render json: @user, serializer: SessionSerializer, root: nil
      else
        invalid_login_response
      end
    end

    private

    def invalid_login_response
      warden.custom_failure!
      render json: {error: 'Unable to login, please check the email or password.'},
        status: :unprocessable_entity
    end
  end
end
