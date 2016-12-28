module V1
  class UsersController < ApplicationController
    skip_before_action :authenticate_user!, only: [:create]

    def create
      @user = User.new
      @user.update_attributes user_params
      authorize @user

      if @user.save
        render status: 201, json: @user, serializer: V1::SessionSerializer, root: nil
      else
        render status: 422, json: {error: @user.errors.full_messages.first}
      end
    end

    def update
      @user = User.find(params[:id])
      authorize @user

      if @user.update(user_params)
        render json: @user, serializer: V1::SessionSerializer, root: nil
      else
        render json: { error: @user.errors.full_messages.first }, status: 422
      end
    end

    def destroy
      @user = User.find(params[:id])
      authorize @user
      @user.destroy
      render json: @user, serializer: V1::SessionSerializer
    end

    def index
      @users = User.all
      authorize(@users)
      render json: @users, each_serializer: V1::SessionSerializer
    end

    def show
      @user = User.find(params[:id])
      authorize(@user)
      render json: @user, serializer: V1::SessionSerializer
    end

    private

    def user_params
      permitted_attributes(@user)
    end
  end
end
