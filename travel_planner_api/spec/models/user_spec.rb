require 'rails_helper'

RSpec.describe User, type: :model do
  it { should validate_presence_of(:email) }
  it { should have_many(:trips) }

  describe '#set_default_role' do
    it 'sets the default role after initialization' do
      user = build(:user)
      expect(user.user?).to be true
    end

    it 'does not assign admin' do
      user = build(:user)
      expect(user.admin?).to be false
    end

    it 'does not override role if already set' do
      user = build(:user, role: :admin)
      expect(user.admin?).to be true
    end
  end

  describe '#update_access_token!' do
    it 'assigns an access token after creation that contains the id' do
      user = create(:user)
      expect(user.access_token).to include(user.id.to_s)
      expect(user.access_token).to include(':')
    end
  end

end
