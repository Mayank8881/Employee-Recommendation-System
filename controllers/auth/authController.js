import supabase from "../../config/supabase.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateToken } from "../../utils/jwt.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;

    // check if user exists
    const { data: existingUser } = await supabase
      .from("employees")
      .select("*")
      .eq("email", email);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const { data: roleData, error: roleError } = await supabase
      .from("roles")
      .select("id, name")
      .eq("name", role || "user")
      .single();

    if (roleError || !roleData) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const hashedPassword = await hashPassword(password);

    const { data, error } = await supabase
      .from("employees")
      .insert([
        {
          first_name,
          last_name,
          email,
          password: hashedPassword,
          role_id: roleData.id
        }
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: data[0].id,
        email: data[0].email,
        role: roleData.name,
        role_id: roleData.id
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase
      .from("employees")
      .select(`
        *,
        roles(name)
      `)
      .eq("email", email);

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = data[0];

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 IMPORTANT: include role_id in token
    const token = generateToken({
      id: user.id,
      role_id: user.role_id
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.roles?.name,
        role_id: user.role_id
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//ADMIN SET PASSWORD
// export const adminSetPassword = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { password } = req.body;

//     // validation
//     if (!password || password.length < 4) {
//       return res.status(400).json({
//         message: "Password must be at least 4 characters"
//       });
//     }

//     // check if user exists
//     const { data: user, error: fetchError } = await supabase
//       .from("employees")
//       .select("*")
//       .eq("id", userId);

//     if (fetchError) throw fetchError;

//     if (!user || user.length === 0) {
//       return res.status(404).json({
//         message: "User not found"
//       });
//     }

//     // hash password
//     const hashedPassword = await hashPassword(password);

//     // update password
//     const { data, error } = await supabase
//       .from("employees")
//       .update({ password: hashedPassword })
//       .eq("id", userId)
//       .select();

//     if (error) throw error;

//     res.json({
//       message: "Password set successfully by admin",
//       user: {
//         id: data[0].id,
//         email: data[0].email,
//         role: data[0].role
//       }
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
export const adminSetPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;

    if (!password || password.length < 4) {
      return res.status(400).json({
        message: "Password must be at least 4 characters"
      });
    }

    const { data: user, error: fetchError } = await supabase
      .from("employees")
      .select(`
        *,
        roles(name)
      `)
      .eq("id", userId);

    if (fetchError) throw fetchError;

    if (!user || user.length === 0) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const hashedPassword = await hashPassword(password);

    const { data, error } = await supabase
      .from("employees")
      .update({ password: hashedPassword })
      .eq("id", userId)
      .select();

    if (error) throw error;

    res.json({
      message: "Password set successfully by admin",
      user: {
        id: data[0].id,
        email: data[0].email
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};