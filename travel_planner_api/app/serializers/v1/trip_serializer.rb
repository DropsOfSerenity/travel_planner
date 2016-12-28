module V1
  class TripSerializer < ActiveModel::Serializer
    attributes :id, :destination, :start_date, :end_date, :comment, :latitude, :longitude, :user_email

    def user_email
      object.user.email
    end
  end
end
