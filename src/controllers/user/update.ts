import { Request, Response, NextFunction } from 'express'
import { User } from '../../orm/entities/User'
import dataSource from '../../orm/dataSource'
import { successResponse, errorResponse } from '../../utils/response'

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { firstName, lastName, email } = req.body
    const userRepository = dataSource.getRepository(User)

    const user = await userRepository.findOne({ where: { id } })
    if (!user) {
      errorResponse(res, 404, 'User not found')
      return
    }
    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    await userRepository.save(user)

    successResponse(res, 200, 'User updated successfully', user)
  } catch (error) {
    errorResponse(res, 500, 'Internal server error')
  }
}
