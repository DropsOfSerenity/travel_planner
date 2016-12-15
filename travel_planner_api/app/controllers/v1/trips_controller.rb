module V1
  class TripsController < ApplicationController
    def create
      @trip = Trip.new(trip_params)
      authorize @trip

      if @trip.save
        render json: @trip, serializer: TripSerializer, status: 201
      else
        render json: { error: @trip.errors.full_messages.first },
          status: 422
      end
    end

    def index
      @trips = policy_scope(Trip)
      authorize @trips
      render json: @trips, each_serializer: TripSerializer
    end

    def show
      @trip = Trip.find(params[:id])
      authorize @trip
      render json: @trip, serializer: TripSerializer
    end

    def update
      @trip = Trip.find(params[:id])
      authorize @trip

      if @trip.update(trip_params)
        render json: @trip, serializer: TripSerializer
      else
        render json: { error: @trip.errors.full_messages.first },
          status: 422
      end
    end

    def destroy
      @trip = Trip.find(params[:id])
      authorize @trip
      @trip.destroy
      render json: @trip, serializer: TripSerializer
    end

    private

    def trip_params
      params.require(:trip)
        .permit(:destination, :start_date, :end_date, :comment)
        .merge(user: current_user)
    end
  end
end
