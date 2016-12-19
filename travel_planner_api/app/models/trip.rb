class Trip < ApplicationRecord
  belongs_to :user

  validates :destination, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true

  geocoded_by :destination
  after_validation :geocode, if: ->(obj){ obj.destination.present? and obj.destination_changed? }
end
