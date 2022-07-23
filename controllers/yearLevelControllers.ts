import { AppDataSource } from "../database/data-source";
import { YearLevel } from "../database/entity/YearLevel";

export const addYearLevel = async (req,res) => {
    const body = req.body;
    const yearLevelRepository = AppDataSource.getRepository(YearLevel);
    await yearLevelRepository.save(body);
    return res.status(201).send({ message: 'Year Level successfully added', data: body});
}

export const getYearLevels = async (req, res) => {
    const yearLevelRepository = AppDataSource.getRepository(YearLevel);
    const yearLevels = await yearLevelRepository.find();
    return res.status(200).send({ message: 'Request successful', data: yearLevels});
} 