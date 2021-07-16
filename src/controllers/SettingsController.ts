import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../repositories/SettingsRepository';
import { SettingsService } from '../services/SettingsService';

class SettingsController {
    async create(request: Request, response: Response) {
        try {
            const { chat, username } = request.body;
            const settingsService = new SettingsService();
            const settings = await settingsService.create({ chat, username });
            return response.status(201).json(settings);
        } catch (e) {
            return response.status(500).json({
                message: e.message
            })
        }

    }

    async index(request: Request, response: Response) {
        const settingsService = new SettingsService();
        const settings = await settingsService.index();
        return response.status(200).json(settings);
    }
}

export default new SettingsController();