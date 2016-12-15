FactoryGirl.define do
  factory :trip do
    destination { Faker::Pokemon.location }
    start_date { Faker::Date.between(Date.today, 14.days.from_now) }
    end_date { Faker::Date.between(15.days.from_now, 25.days.from_now) }
    user
  end

  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password }

    trait :manager do
      role :manager
    end

    trait :admin do
      role :admin
    end

    trait :with_trips do
      after :create do |user|
        FactoryGirl.create_list :trip, 3, user: user
      end
    end
  end
end
