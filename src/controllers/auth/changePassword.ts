import { Request, Response, NextFunction } from 'express'
import { User } from '../../orm/entities/User'
import dataSource from '../../orm/dataSource'
import { successResponse, errorResponse } from '../../utils/response'

export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const { password, passwordNew } = req.body

  try {
    const { id } = req.jwtPayload

    const userRepository = dataSource.getRepository(User)
    const user = await userRepository.findOne({ where: { id } })

    if (!user) {
      return errorResponse(res, 404, 'Not found')
    }

    if (!user.checkIfPasswordMatch(password)) {
      return errorResponse(res, 400, 'Your old password is incorrect')
    }

    user.password = passwordNew
    user.hashPassword()
    await userRepository.save(user)

    return successResponse(res, 200, 'Password changed successfully')
  } catch (err) {
    return errorResponse(res, 500, 'Internal server error')
  }
}
