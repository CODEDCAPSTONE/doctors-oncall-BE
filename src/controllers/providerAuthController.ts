// import { Request, Response } from 'express';
// import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import { z } from 'zod';

// import { hashPassword } from '../utils/hashPassword';
// import HealthCareProvider from '../models/HealthCareProvider';
// import Doctor from '../models/Doctor';
// import Nurse from '../models/Nurse';
// import Lab from '../models/Lab';
// import Physiotherapist from '../models/Physiotherapist';

// import {
//   doctorRegistrationSchema,
//   nurseRegistrationSchema,
//   labRegistrationSchema,
//   physiotherapistRegistrationSchema,
// } from '../validations/providerValidations';

// type DoctorRegistration = z.infer<typeof doctorRegistrationSchema>;
// type NurseRegistration = z.infer<typeof nurseRegistrationSchema>;
// type LabRegistration = z.infer<typeof labRegistrationSchema>;
// type PhysiotherapistRegistration = z.infer<typeof physiotherapistRegistrationSchema>;

// // 🧰 Utilities
// const handleYOEX = (YOEX: string | number): number => {
//   const yoexNumber = Number(YOEX);
//   if (isNaN(yoexNumber)) throw new Error('YOEX must be a valid number');
//   return yoexNumber;
// };

// const generateToken = (payload: { providerId: string; role: string }): string => {
//   const secret = process.env.JWT_SECRET || "default_jwt_secret";
//   return jwt.sign(payload, secret, { expiresIn: '1h' });
// };

// const buildUserResponse = (
//   token: string,
//   role: string,
//   provider: any,
//   roleDoc: any
// ) => {
//   const merged = {
//     ...provider.toObject(),
//     ...roleDoc?.toObject(),
//     role,
//     token
//   };
//   delete merged.provider;
//   return merged;
// };

// // 📌 Generic Register Helper
// const registerHelper = async (
//   req: Request,
//   res: Response,
//   role: 'Doctor' | 'Nurse' | 'Lab' | 'Physiotherapist',
//   Model: any
// ) => {
//   try {
//     const body = req.body;
//     const profileImage = req.file?.path || '';

//     const savedProvider = await new HealthCareProvider({
//       ...body,
//       YOEX: handleYOEX(body.YOEX),
//       password: await hashPassword(body.password),
//       image: profileImage,
//       role,
//     }).save();

//     const roleDoc = await Model.create({
//       ...body,
//       provider: savedProvider._id,
//       image: profileImage,
//     });

//     const populatedRoleDoc = await Model.findById(roleDoc._id).populate('provider');
//     const token = generateToken({ providerId: savedProvider._id.toString(), role: role.toLowerCase() });

//     return res.status(201).json(buildUserResponse(token, role, savedProvider, populatedRoleDoc));
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: `Error registering ${role.toLowerCase()}`, error: err });
//   }
// };

// // 🩺 Register Endpoints
// export const registerProviderDoctor = (req: Request, res: Response) =>
//   registerHelper(req, res, 'Doctor', Doctor);

// export const registerProviderNurse = (req: Request, res: Response) =>
//   registerHelper(req, res, 'Nurse', Nurse);

// export const registerProviderLab = (req: Request, res: Response) =>
//   registerHelper(req, res, 'Lab', Lab);

// export const registerProviderPhysiotherapist = (req: Request, res: Response) =>
//   registerHelper(req, res, 'Physiotherapist', Physiotherapist);

// // 🩺 Login
// export const loginProvider = async (req: Request, res: Response) => {
//   const { civilId, password } = req.body;

//   try {
//     const provider = await HealthCareProvider.findOne({ civilID: civilId });
//     if (!provider) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, provider.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = generateToken({ providerId: provider._id.toString(), role: provider.role.toLowerCase() });

//     let populatedRoleDoc = null;
//     switch (provider.role) {
//       case 'Doctor':
//         populatedRoleDoc = await Doctor.findOne({ provider: provider._id }).populate('provider');
//         break;
//       case 'Nurse':
//         populatedRoleDoc = await Nurse.findOne({ provider: provider._id }).populate('provider');
//         break;
//       case 'Lab':
//         populatedRoleDoc = await Lab.findOne({ provider: provider._id }).populate('provider');
//         break;
//       case 'Physiotherapist':
//         populatedRoleDoc = await Physiotherapist.findOne({ provider: provider._id }).populate('provider');
//         break;
//       default:
//         console.warn(`Unknown role: ${provider.role}`);
//     }

//     return res.status(200).json(buildUserResponse(token, provider.role, provider, populatedRoleDoc));
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error logging in', error });
//   }
// };

// // 📝 Get By ID
// export const getProviderById = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: 'Invalid ID format' });
//   }

//   try {
//     const provider = await HealthCareProvider.findById(id);
//     if (!provider) return res.status(404).json({ message: 'Provider not found' });

//     let populatedRoleDoc = null;
//     switch (provider.role) {
//       case 'Doctor':
//         populatedRoleDoc = await Doctor.findOne({ provider: id }).populate('provider');
//         break;
//       case 'Nurse':
//         populatedRoleDoc = await Nurse.findOne({ provider: id }).populate('provider');
//         break;
//       case 'Lab':
//         populatedRoleDoc = await Lab.findOne({ provider: id }).populate('provider');
//         break;
//       case 'Physiotherapist':
//         populatedRoleDoc = await Physiotherapist.findOne({ provider: id }).populate('provider');
//         break;
//     }

//     res.status(200).json(buildUserResponse('', provider.role, provider, populatedRoleDoc));
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching provider' });
//   }
// };

// // 📋 Get All
// export const getAllProviders = async (_req: Request, res: Response) => {
//   try {
//     const providers = await HealthCareProvider.find();
//     res.status(200).json(providers);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error fetching providers' });
//   }
// };

// // ✏️ Update by Provider ID
// export const updateProvider = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const updateData = req.body;

//   if (req.file?.path) {
//     updateData.image = req.file.path;
//   }

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: 'Invalid ID format' });
//   }

//   try {
//     const provider = await HealthCareProvider.findByIdAndUpdate(id, updateData, { new: true });
//     if (!provider) return res.status(404).json({ message: 'Provider not found' });

//     res.status(200).json(provider);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error updating provider' });
//   }
// };

// // ✏️ Update by Doctor ID
// export const updateDoctorByDoctorId = async (req: Request, res: Response) => {
//   const { id } = req.params; // doctor._id
//   const updateData = req.body;

//   if (req.file?.path) {
//     updateData.image = req.file.path;
//   }

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: 'Invalid ID format' });
//   }

//   try {
//     const doctor = await Doctor.findById(id);
//     if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

//     const providerId = doctor.provider;

//     const provider = await HealthCareProvider.findByIdAndUpdate(providerId, updateData, { new: true });
//     if (!provider) return res.status(404).json({ message: 'Provider not found' });

//     res.status(200).json(provider);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error updating doctor info' });
//   }
// };

// // 🗑️ Delete
// export const deleteProvider = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: 'Invalid ID format' });
//   }

//   try {
//     const provider = await HealthCareProvider.findByIdAndDelete(id);
//     if (!provider) return res.status(404).json({ message: 'Provider not found' });

//     res.status(204).end();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error deleting provider' });
//   }
// };


import { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { hashPassword } from '../utils/hashPassword';
import HealthCareProvider from '../models/HealthCareProvider';
import Doctor from '../models/Doctor';
import Nurse from '../models/Nurse';
import Lab from '../models/Lab';
import Physiotherapist from '../models/Physiotherapist';

import {
  doctorRegistrationSchema,
  nurseRegistrationSchema,
  labRegistrationSchema,
  physiotherapistRegistrationSchema,
} from '../validations/providerValidations';

// Types
type DoctorRegistration = z.infer<typeof doctorRegistrationSchema>;
type NurseRegistration = z.infer<typeof nurseRegistrationSchema>;
type LabRegistration = z.infer<typeof labRegistrationSchema>;
type PhysiotherapistRegistration = z.infer<typeof physiotherapistRegistrationSchema>;

const handleYOEX = (YOEX: string | number): number => {
  const yoexNumber = Number(YOEX);
  if (isNaN(yoexNumber)) throw new Error('YOEX must be a valid number');
  return yoexNumber;
};

const generateToken = (payload: { providerId: string; role: string }): string => {
  const secret = process.env.JWT_SECRET || 'default_jwt_secret';
  return jwt.sign(payload, secret, { expiresIn: '1h' });
};

const buildUserResponse = (
  token: string,
  role: string,
  provider: any,
  roleDoc: any
) => {
  const merged = {
    ...provider.toObject(),
    ...roleDoc?.toObject(),
    role,
    token,
  };
  delete merged.provider;
  return merged;
};

const registerHelper = async (
  req: Request,
  res: Response,
  role: 'Doctor' | 'Nurse' | 'Lab' | 'Physiotherapist',
  Model: any
) => {
  try {
    const body = req.body;
    const profileImage = req.file?.path || '';

    const savedProvider = await new HealthCareProvider({
      ...body,
      YOEX: handleYOEX(body.YOEX),
      password: await hashPassword(body.password),
      image: profileImage,
      role,
    }).save();

    const roleDoc = await Model.create({
      ...body,
      provider: savedProvider._id,
      image: profileImage,
    });

    const populatedRoleDoc = await Model.findById(roleDoc._id).populate('provider');
    const token = generateToken({ providerId: savedProvider._id.toString(), role: role.toLowerCase() });

    return res.status(201).json(buildUserResponse(token, role, savedProvider, populatedRoleDoc));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `Error registering ${role.toLowerCase()}`, error: err });
  }
};

export const registerProviderDoctor = (req: Request, res: Response) =>
  registerHelper(req, res, 'Doctor', Doctor);

export const registerProviderNurse = (req: Request, res: Response) =>
  registerHelper(req, res, 'Nurse', Nurse);

export const registerProviderLab = (req: Request, res: Response) =>
  registerHelper(req, res, 'Lab', Lab);

export const registerProviderPhysiotherapist = (req: Request, res: Response) =>
  registerHelper(req, res, 'Physiotherapist', Physiotherapist);

export const loginProvider = async (req: Request, res: Response) => {
  const { civilId, password } = req.body;

  try {
    const provider = await HealthCareProvider.findOne({ civilID: civilId });
    if (!provider) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ providerId: provider._id.toString(), role: provider.role.toLowerCase() });

    let populatedRoleDoc: any = null;
    switch (provider.role) {
      case 'Doctor':
        populatedRoleDoc = await Doctor.findOne({ provider: provider._id }).populate('provider');
        break;
      case 'Nurse':
        populatedRoleDoc = await Nurse.findOne({ provider: provider._id }).populate('provider');
        break;
      case 'Lab':
        populatedRoleDoc = await Lab.findOne({ provider: provider._id }).populate('provider');
        break;
      case 'Physiotherapist':
        populatedRoleDoc = await Physiotherapist.findOne({ provider: provider._id }).populate('provider');
        break;
    }

    return res.status(200).json(buildUserResponse(token, provider.role, provider, populatedRoleDoc));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const getProviderById =async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const provider = await HealthCareProvider.findById(id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    let populatedRoleDoc: any = null;

    switch (provider.role) {
      case 'Doctor':
        populatedRoleDoc = await Doctor.findOne({ provider: provider._id })
          .populate('provider')
          .populate('appointments')
          .populate('prescriptions');
        break;

      case 'Nurse':
        populatedRoleDoc = await Nurse.findOne({ provider: provider._id })
          .populate('provider');
        break;

      case 'Lab':
        populatedRoleDoc = await Lab.findOne({ provider: provider._id })
          .populate('provider');
        break;

      case 'Physiotherapist':
        populatedRoleDoc = await Physiotherapist.findOne({ provider: provider._id })
          .populate('provider');
        break;

      default:
        return res.status(400).json({ message: `Unknown role: ${provider.role}` });
    }

    if (!populatedRoleDoc || !populatedRoleDoc.provider) {
      return res.status(404).json({ message: 'Role document or provider not found' });
    }

    const merged = {
      ...provider.toObject(),
      ...populatedRoleDoc.toObject(),
      role: provider.role,
    };

    delete merged.provider;

    return res.status(200).json(merged);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching provider' });
  }
};


export const getAllProviders = async (_req: Request, res: Response) => {
  try {
    const providers = await HealthCareProvider.find();
    res.status(200).json(providers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching providers' });
  }
};

export const updateDoctorByDoctorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  if (req.file?.path) {
    updateData.image = req.file.path;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    if (!doctor.provider) {
      return res.status(404).json({ message: 'Doctor has no linked provider' });
    }

    const provider = await HealthCareProvider.findByIdAndUpdate(
      doctor.provider,
      updateData,
      { new: true }
    );

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.status(200).json(provider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating doctor info' });
  }
};

export const updateProvider = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  if (req.file?.path) {
    updateData.image = req.file.path;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const provider = await HealthCareProvider.findByIdAndUpdate(id, updateData, { new: true });
    if (!provider) return res.status(404).json({ message: 'Provider not found' });

    res.status(200).json(provider);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating provider' });
  }
};

export const deleteProvider = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const provider = await HealthCareProvider.findByIdAndDelete(id);
    if (!provider) return res.status(404).json({ message: 'Provider not found' });

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting provider' });
  }
};
