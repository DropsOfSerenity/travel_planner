module V1
  class TripSerializer < ActiveModel::Serializer
    attributes :id, :destination, :start_date, :end_date, :comment
  end
end
