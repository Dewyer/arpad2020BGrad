using arpadGrad2020api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace arpadGrad2020api.Data
{
	public class ArpadGrad2020DbContext : DbContext
	{
		public ArpadGrad2020DbContext(DbContextOptions<ArpadGrad2020DbContext> options)
			: base(options)
		{


		}

		public DbSet<BoardItem> BoardItems { get; set; }
	}
}
