class UserPolicy < ApplicationPolicy
  def create?
    true
  end

  def update?
    record.id == user.id || user.manager? || user.admin?
  end

  def destroy?
    record.id == user.id || user.manager? || user.admin?
  end

  def index?
    user.manager? || user.admin?
  end

  def show?
    record.id == user.id || user.manager? || user.admin?
  end

end
