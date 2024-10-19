using Microsoft.EntityFrameworkCore;
using PreparationTracker.Data;

namespace PreparationTracker.Utilities
{
    public class TopicUtility
    {
        private readonly AppDbContext _context;

        public TopicUtility(AppDbContext context)
        {
            _context = context;
        }

        public async Task VerifyTopicExists(Guid topicId)
        {
            var exists = await _context.Topics.AnyAsync(e => e.Guid == topicId);
            if (!exists)
            {
                throw new Exception("Topic not found");
            }
        }
    }
}
