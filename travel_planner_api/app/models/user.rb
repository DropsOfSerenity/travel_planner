class User < ApplicationRecord
  devise :database_authenticatable, :recoverable, :validatable
  enum role: [:user, :manager, :admin]

  has_many :trips, dependent: :destroy

  after_initialize :set_default_role, :if => :new_record?
  after_create :update_access_token!

  validates :email, presence: true

  def set_default_role
    self.role ||= :user
  end

  private

  def update_access_token!
    self.access_token = "#{self.id}:#{Devise.friendly_token}"
    save
  end

end
