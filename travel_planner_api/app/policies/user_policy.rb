class UserPolicy < ApplicationPolicy
  def permitted_attributes
    if user && user.admin?
      [:email, :password, :role]
    else
      [:email, :password]
    end
  end

  def create?
    true
  end

  def update?
    record.id == user.id || user.manager? || user.admin?
  end

  def destroy?
    if record.admin?
      return false if !user.admin?
    end
    record.id == user.id || user.manager? || user.admin?
  end

  def index?
    user.manager? || user.admin?
  end

  def show?
    record.id == user.id || user.manager? || user.admin?
  end

end
