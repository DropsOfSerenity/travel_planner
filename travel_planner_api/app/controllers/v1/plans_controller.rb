module V1
  class PlansController < ApplicationController
    def index
      @trips = policy_scope(Trip)
        .where('start_date >= ?', Date.today)
        .where('start_date <= ?', 30.days.from_now)
        .order(start_date: :asc)
      authorize @trips
      render json: @trips, each_serializer: TripSerializer
    end
  end
end
