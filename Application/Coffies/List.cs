using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Coffies
{
    public class List
    {
        public class Query : IRequest<List<Coffee>> { }

        public class Handler : IRequestHandler<Query, List<Coffee>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<List<Coffee>> Handle(Query request, CancellationToken cancellationToken)
            {
                var coffies = await _context.Coffee.ToListAsync();

                return coffies;
            }
        }
    }
}