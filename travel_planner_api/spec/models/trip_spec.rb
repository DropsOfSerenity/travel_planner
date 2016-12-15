require 'rails_helper'

RSpec.describe Trip, type: :model do
  it { should belong_to(:user) }
  it { should validate_presence_of(:destination) }
  it { should validate_presence_of(:start_date) }
  it { should validate_presence_of(:end_date) }
end
