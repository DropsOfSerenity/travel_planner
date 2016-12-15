require 'rails_helper'

describe TripPolicy do
  subject { described_class }

  permissions :update?, :destroy?, :show? do
    it 'allows access to resource owner' do
      user = create(:user)
      trip = create(:trip, user: user)

      expect(subject).to permit(user, trip)
    end

    it 'denies access to non resource owners' do
      user = create(:user)
      trip = create(:trip)

      expect(subject).not_to permit(user, trip)
    end

    it 'allows access to admins' do
      admin = create(:user, :admin)
      trip = create(:trip)

      expect(subject).to permit(admin, trip)
    end

    it 'denies access to managers' do
      manager = create(:user, :manager)
      trip = create(:trip)

      expect(subject).not_to permit(manager, trip)
    end
  end

  permissions :index?, :create? do
    it 'allows access to logged in users' do
      user = create(:user)
      trip = create(:trip, user: user)

      expect(subject).to permit(user, trip)
    end
  end

  permissions '.scope' do
    it 'scopes a users trips to only their own' do
      user = create(:user)
      trip = create(:trip)
      user_trip = create(:trip, user: user)

      policy_scope = TripPolicy::Scope.new(user, Trip.all).resolve

      expect(policy_scope).to include(user_trip)
      expect(policy_scope).not_to include(trip)
    end

    it 'scopes all trips to an admin' do
      user = create(:user, :admin)
      create_list(:trip, 3)

      policy_scope = TripPolicy::Scope.new(user, Trip.all).resolve

      expect(policy_scope.count).to eq(3)
    end

    it 'scopes no external trips to manager' do
      user = create(:user, :manager)
      create_list(:trip, 3)

      policy_scope = TripPolicy::Scope.new(user, Trip.all).resolve

      expect(policy_scope.count).to eq(0)
    end
  end
end
