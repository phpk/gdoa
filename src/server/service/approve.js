module.exports = class extends think.Service {
    async getStatus(approve_id) {
        return this.model('approve_status').where({id : approve_id}).select()
    }
    
}