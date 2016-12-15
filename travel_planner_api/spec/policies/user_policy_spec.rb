require 'rails_helper'

describe UserPolicy do
  subject { described_class }

  permissions :update?, :destroy?, :show? do
    it 'allows access to resource owner' do
      user = create(:user)

      expect(subject).to permit(user, user)
    end

    it 'denies access to non resource owners' do
      user = create(:user)
      user2 = create(:user)

      expect(subject).not_to permit(user, user2)
    end

    it 'allows access to admins' do
      admin = create(:user, :admin)
      user = create(:user)

      expect(subject).to permit(admin, user)
    end

    it 'allows access to managers' do
      manager = create(:user, :manager)
      user = create(:user)

      expect(subject).to permit(manager, user)
    end
  end

  permissions :create? do
    it 'allows anyone to create a user' do
      expect(subject).to permit(nil)
    end
  end

  permissions :index? do
    it 'allows admins to index' do
      admin = create(:user, :admin)

      expect(subject).to permit(admin)
    end

    it 'allows managers to index' do
      manager = create(:user, :manager)

      expect(subject).to permit(manager)
    end

    it 'denies access to normal users' do
      user = create(:user)

      expect(subject).not_to permit(user)
    end
  end
end
