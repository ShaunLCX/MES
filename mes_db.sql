USE [mes_db]
GO

/****** Object:  Table [dbo].[Production]    Script Date: 6/19/2024 6:38:13 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Production](
	[id] [uniqueidentifier] NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[status] [nvarchar](255) NOT NULL,
	[startDate] [datetime] NULL,
	[endDate] [datetime] NULL,
	[createdAt] [datetime] NOT NULL,
	[updatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Production] ADD  DEFAULT (getdate()) FOR [createdAt]
GO


GO




/****** Object:  Table [dbo].[QualityControl]    Script Date: 6/19/2024 6:38:04 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[QualityControl](
	[id] [uniqueidentifier] NOT NULL,
	[productionId] [uniqueidentifier] NOT NULL,
	[inspectionDate] [datetime] NULL,
	[result] [nvarchar](max) NULL,
	[defects] [int] NULL,
	[createdAt] [datetime] NOT NULL,
	[updatedAt] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[QualityControl] ADD  DEFAULT (getdate()) FOR [createdAt]
GO


ALTER TABLE [dbo].[QualityControl]  WITH CHECK ADD FOREIGN KEY([productionId])
REFERENCES [dbo].[Production] ([id])
GO




