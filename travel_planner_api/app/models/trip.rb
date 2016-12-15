class Trip < ApplicationRecord
  belongs_to :user

  validates :destination, presence: true
  validates :start_date, presence: true
  validates :end_date, presence: true
end
