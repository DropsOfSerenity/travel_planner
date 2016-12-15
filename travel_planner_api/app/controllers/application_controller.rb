class ApplicationController < ActionController::API
  include Pundit
  respond_to :json

  before_action :authenticate_user!
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found

  def authenticate_user!
    auth_token = request.headers['Authorization']

    if auth_token
      authenticate_with_token auth_token
    else
      user_not_authorized
    end
  end

  private

  def user_not_authorized
    render json: {error: 'unauthorized'}, status: 401
  end

  def record_not_found(error)
    render json: { error: 'not found' }, status: :not_found
  end

  def authenticate_with_token(auth_token)
    return render json: {error: 'unauthorized'}, status: 401 unless auth_token.include?(':')

    user_id = auth_token.split(':').first
    user = User.find(user_id)

    if user && Devise.secure_compare(user.access_token, auth_token)
      sign_in user, store: false
    else
      user_not_authorized
    end
  end
end
