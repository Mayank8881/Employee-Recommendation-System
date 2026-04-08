import supabase from "../../config/supabase.js";

// ✅ Assign permission
export const addRolePermission = async (role_id, permission_id) => {
  const { error } = await supabase
    .from("role_permissions")
    .insert([{ role_id, permission_id }]);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};


// ✅ Remove permission
export const deleteRolePermission = async (role_id, permission_id) => {
  const { error } = await supabase
    .from("role_permissions")
    .delete()
    .eq("role_id", role_id)
    .eq("permission_id", permission_id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};


// ✅ Get permissions
export const getPermissionsByRoleId = async (roleId) => {
  const { data, error } = await supabase
    .from("role_permissions")
    .select(`permissions(id, name, resource, action)`)
    .eq("role_id", roleId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};